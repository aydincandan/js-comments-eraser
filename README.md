## Türkçe

Projenize dahil etmek için aşağıdaki gibi yapın.

```
$ npm i js-comments-eraser
```

Komut satırından kullanabilmek için **yorumyok.js** gibi bir dosya açın ve içine aşağıdakini yapıştırın.


```
return yorumyok = require('js-comments-eraser')
```

Daha sonra aşağıdaki gibi komut satırından kullanın.

```
$ node yorumyok yorumlu.js yorumsuz.js
```

[js-comments-eraser](https://github.com/aydincandan/js-comments-eraser/pulls) için önerileriniz dikkate alınacaktır.



## English

To include it in your project, do the following.

```
$ npm i js-comments-eraser
```

To use it from the command line, open a file like **nocomments.js** and paste the following into it.

```
return nocomments = require('js-comments-eraser')
```

Then use it from the command line as follows.

```
$ node nocomments withcomments.js withoutcomments.js
```

Your suggestions for [js-comments-eraser](https://github.com/aydincandan/js-comments-eraser/pulls) will be taken into consideration.