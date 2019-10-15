---
subjects: !file subjects.yaml
---
# Tantárgyak

<nav class="three columns">
  {{#subjects}}
  <a href="{{url}}" class="{{color}} card">
    <strong>{{name}}</strong>
    <p>{{details}}</p>
  </a>
  {{/subjects}}
</nav>
