# Laravel -- Input data, form processing

## Tasks

1. Create the transposer page!
   - endpoint: `GET /transposer`
   - controller: `TransposerController@index`
   - display the form!
   - helyes adatokat felküldve végezd el a transzponálást és írd ki az eredményt!
   - supposing that valid input data was sent, transpose the note and write the result to the page!
     ```php
     function transpose(string $key, int $distance): string {
       $keys = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','H'];
       $pos = array_search($key, $keys);
       $newPos = ($pos + $distance) % 12;
       return $keys[$newPos];
     }
     ```
   - validate the sent data, in case of errors write them out!
2. Prepare to add a new project without saving!
3. Prepare to edit a project without saving!

## Input options

### Route parameters

```php
Route::get('/foo/{id}/edit', function ($id) {

});
```

### GET and POST parameters

Laravel gives access to the data in the request through a `Request` object:

```php
public function index(Request $request) {

}
// or
public function index() {
  $request = request()
}
```

There are many ways to access incoming data via the `$request` object (see documentation), e.g.

```php
$request->input('foo') // GET and POST
$request->query('foo') // GET
$request->post('foo')  // POST
$request->foo          // GET and POST
request('foo')         // GET and POST
```

## Model: business logic class

The models are responsible for storing and processing the data. In the simplest case, there is no need for persistence, so it is enough to add the class that encloses the business logic into the `app/Models` folder:

```php
class SomeBusinessModel {
  public function do_something(int $a): string {

  }
}
```

Such a model can be instantiated in the controller in two ways. In the second case, we ask the Laravel service container to create the instance.

```php
public function index(Request $request)
{
  $model = new \App\SomeBusinessModel();
}
// or
public function index(Request $request, \App\SomeBusinessModel $model)
{

}
```

## Validation

Data coming from the user interface must always be checked. Laravel provides a very convenient interface for checking incoming data. Laravel supports and implements the PRG model.

In the vast majority of cases, it is sufficient to call the `validate` method of the `$request` object, passing the validation rules for it as a parameter. This function checks the input in the request, automatically redirects the browser to the previous page in case of an error, and returns the verified data in case of success. For a list of validation rules, see the documentation.

```php
public function method(Request $request) {
  $validatedData = $request->validate([
    'input-name-1' => 'rule1|rule2|rule3',
    'input-name-2' => ['rule1', 'rule2', 'rule3'],
  ]);
}
```

In a smaller number of cases, it is necessary to control the process manually:

- creation of the validator
- running the validation
- redirection in case of error
- in case of an error, pass the errors to the view

```php
public function method(Request $request) {
  // creating a Validator
  $validator = Validator::make($request->all(), [
    'input-name-1' => 'rule1|rule2|rule3',
    'input-name-2' => ['rule1', 'rule2', 'rule3'],
  ]);

  // validation, redirects in case of errors
  $validator->validate();
  // or
  // validation, manual redirection if necessary
  if ($validator->fails()) {
    return redirect('somewhere')
      ->withErrors($validator)
      ->withInput();
  }
  // or
  // validation, manual assigning errors
  if ($validator->fails()) {
    $errors = $validator->errors();
    // if needed:
    $viewErrorBag = new ViewErrorBag();
    $viewErrorBag->put('default', $errors);
    $view->with('errors', $viewErrorBag);
  }

  // validated data
  $validatedData = $validator->validated();
}
```

## Display error messages

You may want to use the `@error` directive to conveniently display error messages.

```php
<input type="text" class="@error('foo') is-invalid @enderror" name="foo">
@error('foo')
  {{ $message }}
@enderror
```

Or to get all the error messages:

```php
$errors->all()
```

## Keeping the form state

The input fields contain what was previously entered so that the user can see, what error he or she has made, and does not have to fill the form again. After redirection, you can use the `old()` helper function.

```php
<input type="text" name="foo"
  value="{{ request()->input('foo', 'default') }}">

<input type="text" name="foo"
  value="{{ old('foo', 'default') }}">
```

## Solution guide

1. Transposing page

   - A static prototype of the page can be found in the downloadable files
   - For displaying the page, see the previous material
   - Form processing has no effect on the server side, so we send it as a `GET` method
   - First we need to check if there has been any data to process
     ```php
     $request->has(['key', 'distance'])
     ```
   - If so, read the input, process it, and write the output
     ```php
     // input
     $key = $request('key');
     $distance = (int)$request('distance');
     // process
     $transposer = new \App\Transposer();
     $newKey = $transposer->transpose($key, $distance);
     // output
     return view('transposer')->with('newKey', $newKey);
     ```
   - We cannot use the `validate` method of the `$request` object for verification, because it redirects in the case of an error, while we want to stay on the page. So we have to limit ourselves to a manual solution. And in case of an error, we have to manually add the validation errors to the view. Because we add an error or solution to the view as needed, we create the `$view` object at the beginning of the process.

     ```php
     $view = view('transposer');
     // set up validator
     $validator = Validator::make($request->only(['key', 'distance']), [
       'key' => [
         'required',
         Rule::in(['C','C#','D','D#','E','F','F#','G','G#','A','A#','H']),
       ],
       'distance'  => 'required|integer'
     ]);

     if ($validator->fails()) {

       // there are errors
       $errors = $validator->errors();
       $veb = new ViewErrorBag();
       $veb->put('default', $errors);
       $view->with('errors', $veb);

     } else {
       // passing the result to the view
     }
     return $view;
     ```

   - Display the errors on the form!
   - Make sure the form state is kept!

2. Create a new project without saving anything
   - show the form (`create`)
   - use `$request->validate()` to validate form data on form submission (`store`)
   - use `@error` and `@enderror` Blade directives for showing the error
   - use `old()` for keeping the form state
3. Edit an existing project
   - show the edit form with some existing (baked-in) data (`edit`)
   - use `$request->validate()` to validate form data on form submission (`update`)
   - use `@error` and `@enderror` Blade directives for showing the error
   - use `old()` for keeping the form state
