
## Türkçe

Projenize dahil etmek için aşağıdaki gibi yapın.

```
$ npm i js-comments-eraser
```

Komut satırından kullanabilmek için **yorumyok.js** gibi bir dosya açın ve içine aşağıdakini yapıştırın.


```
return require('js-comments-eraser').dirname(__dirname)
```

Daha sonra aşağıdaki gibi komut satırından kullanın.

```
$ node yorumyok yorumlu.js yorumsuz.js      # 1.0.1
$ node yorumyok <kaynakDir>                 # 1.1.3
```

[js-comments-eraser](https://github.com/aydincandan/js-comments-eraser/pulls) için önerileriniz dikkate alınacaktır.



## English

To include it in your project, do the following.

```
$ npm i js-comments-eraser
```

To use it from the command line, open a file like **nocomments.js** and paste the following into it.

```
return require('js-comments-eraser').dirname(__dirname)
```

Then use it from the command line as follows.

```
$ node nocomments withcomments.js withoutcomments.js    # 1.0.1
$ node nocomments <sourceDir>                           # 1.1.3

```

Your suggestions for [js-comments-eraser](https://github.com/aydincandan/js-comments-eraser/pulls) will be taken into consideration.