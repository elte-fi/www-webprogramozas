---
materials: !file materials.yaml
---
# Tananyagok

<section class="two columns">
  {{#materials}}
  <a href="{{url}}" class="{{color}} card">
    <strong>{{name}}</strong>
    <p>{{description}}</p>
  </a>
  {{/materials}}
</section>