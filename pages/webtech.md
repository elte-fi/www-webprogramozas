# Webes szoftvertechnológia labor

## Leírás

A webes szoftvertechnológia labor keretében lehetőség van különböző webes projektekben részt venni. A labor tématerületei:

* webes frontendek fejlesztése
* webes adatok vizualizációja
* banki informatika
* webes startupok világa

## Projektek

<style>
a.card strong .label {
  float: right;
  margin-left: 10px;
  padding-right: .6em;
  padding-left: .6em;
  border-radius: 10rem;
  background-color: darkorange;
  display: inline-block;
  padding: .25em .4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
}
</style>
<section class="columns">
  <a data-each="projects" href="{{url}}" class="{{color}} card">
    <strong>{{name}}
      <!-- <span class="label">web</span>
      <span class="label">web2</span> -->
    </strong>
    <p>{{description}}</p>
  </a>
</section>