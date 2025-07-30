# Type system
## String

```
{{ "foo" }}
{{ 'bar' }}
```
Output:
```
foo
bar
```

## Bool

```
{{ false }}
{{ true }}
```

Output:

```


```

Booleans do not produce anything.

## Number

```
{{ 10 }}
{{ -2.1 }}
```

Output:

```
10
-2.1
```

## Type casting

```
{% if a > 0 %} // a infers 'number' type
{% end %}

{{ string(a) }} // render expression must accept 'string' type, so cast explicitly
```

## Namespaces

```
{{ @time::year }}
{{ @case::kebab }}
```

```
{% use @time %}
{{ @year }}
```

## Type casting syntax

```
{% if bool(a) %}
{{ string(a) }}
{{ string(number(a)>2?foo:bar) }}
```

# Statements

## If

```
{% if condition1 %}

{% else if condition2 %}

{% else %}

{% end %}
```

## Switch

```
{% switch expression %}
{% case val1 %}

{% case val2 %}

{% default %}

{% end %}
```

## Raw

```
{% raw %}
{{  }}
{% end %}
```

# Operators

## Logical operators

```
{{ a && b }}
{{ a and b }}

{{ a || b }}
{{ a or b }}

{{ !var }}
{{ not var }}
```

## Arithmetic operators

```
{{ 4 + 2 }}
{{ 4 - 2 }}
{{ 4 * 2 }}
{{ 4 / 2 }}
{{ 4 % 2 }}
{{ 4 // 2 }}
{{ 4 ** 2 }}
```

## Comparison operators

```
{{ 2 == 0 }}
{{ 2 is 0 }}

{{ 2 != 0 }}
{{ 2 is not 0 }}

{{ 2 > 0 }}
{{ 2 < 0 }}
{{ 2 >= 0 }}
{{ 2 <= 0 }}
```

## Ternary operator

```
{{ condition ? val1 : val1 }}
{{ condition do val1 else val1 }}
```

# Filters

```
{{ "hello world" | @snake }}  hello_world
{{ "hello world" | @case::camel }}  helloWorld
{{ "hello world" | @pascal }} HelloWorld
{{ "hello world" | @kebab }}  hello-world
{{ "hello world" | @title }}  Hello World
{{ "hello world" | @capitalize }}  Hello world
{{ "hello world" | @upper }}  HELLO WORLD
{{ "hello world" | @lower }}  hello world
{{ " hello world   " | @trim }}  hello world
{{ "hello world" | @length }}  11
```

## Filters chaining

```
{{ "hello world" | @lower | @kebab }}  hello-world
```
