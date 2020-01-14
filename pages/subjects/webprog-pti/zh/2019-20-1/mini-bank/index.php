<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Mini Bank</title>
  <link rel="stylesheet" href="http://webprogramozas.inf.elte.hu/webprog/zh/minibank/index.css">
</head>

<body>
  <nav class="navbar navbar-dark bg-dark d-flex justify-content-start">
    <span class="navbar-brand mb-0 h1">Mini bank</span>
    <form id="account-filter" class="form-inline ml-5">
      <label class="mr-3 text-light">Account</label>
      <select name="account" class="form-control form-control-sm">
        <!-- <option>12345678-12345678-12345678</option> -->
      </select>
      <button class="btn btn-sm btn-primary ml-1">Select</button>
    </form>
    <span class="navbar-text ml-5">
      <strong>Balance:</strong>
      <span class="badge badge-warning">
        <span id="balance-in-huf">1234</span> HUF
      </span>
      (~<span id="balance-in-eur">?</span> EUR)
      <button id="convert" class="btn btn-sm btn-primary ml-1">Convert (refresh)</button>
    </span>
  </nav>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md">
        <div class="card my-2">
          <div class="card-header bg-info text-light">Filters</div>
          <div class="card-body">
            <form id="filter-form">
              <div class="form-group">
                <label>Category</label>
                <select class="form-control" id="category">
                  <option></option>
                  <option>Other</option>
                  <option>Restaurants</option>
                  <option>Transfers</option>
                  <option>Groceries</option>
                </select>
              </div>
              <div class="form-row">
                <div class="col form-group">
                  <label>Min. Value: <span id="min-value-span" class="badge badge-info"></span></label>
                  <input type="range" min="" max="" value="" class="form-control" id="min-value">
                </div>
                <div class="col form-group">
                  <label>Max. Value: <span id="max-value-span" class="badge badge-info"></span></label>
                  <input type="range" min="" max="" value="" class="form-control" id="max-value">
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="card my-2">
          <div class="card-header bg-info text-light">Transactions</div>
          <div class="card-body">
            <table class="table table-striped table-sm">
              <thead>
                <tr class="table-primary">
                  <th>Date</th>
                  <th>Details</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody id="transactions">

                <tr class="transaction" data-id="1">
                  <td>1/4/2020 12:28:00 AM</td>
                  <td>
                    <div>IKEA</div>
                    <div class="empty">No text was provided.</div>
                    <div>
                      <form class="form-inline">
                        <label class="mr-1">Category:</label>
                        <select class="form-control form-control-sm mr-3 category">
                          <option>Other</option>
                          <option>Restaurants</option>
                          <option>Transfers</option>
                          <option>Groceries</option>
                        </select>
                      </form>
                    </div>
                    <div class="mb-3 hidden">
                      <div>Identifier: 1</div>
                      <div>12345678-12345678-42345677</div>
                      <div>12345678-12345678-32345676</div>
                    </div>
                    <button class="btn btn-sm btn-outline-dark more-button">More</button>
                  </td>
                  <td class="debit">-123 450</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md">
        <div class="card my-2">

          <div class="card-header bg-info text-light">New transaction</div>
          <div class="card-body">
            <div id="errors" class="alert alert-danger"></div>
            <form id="new-transaction" method="POST">
              <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" class="form-control" placeholder="Target name">
                <small class="form-text text-muted">Required</small>
              </div>
              <div class="form-group">
                <label>Account Number</label>
                <input type="text" name="accountNumber" class="form-control" placeholder="12345678-12345678-12345678">
                <small class="form-text text-muted">Required, account number format</small>
              </div>
              <div class="form-group">
                <label>Text</label>
                <input type="text" name="text" class="form-control" placeholder="Message text">
                <small class="form-text text-muted">Max. 64 characters</small>
              </div>
              <div class="form-group">
                <label>Value</label>
                <input type="text" name="value" class="form-control" placeholder="1234">
                <small class="form-text text-muted">Required, integer, greater than 0, less than available balance</small>
              </div>
              <div class="form-group">
                <label>Category</label>
                <select name="category" class="form-control">
                  <option>Other</option>
                  <option>Restaurants</option>
                  <option>Transfers</option>
                  <option>Groceries</option>
                </select>
                <small class="form-text text-muted">Required</small>
              </div>
              <button class="btn btn-primary" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>

</html>