##### This is a plugin for handling static resources via koa
##### Instructions
```javascript
const koa = require("koa")
const static = require("static-resource-plugin")
const app = new koa()
app.use(static())
app.listen(3000)
console.log("app is running at http://localhost:3000")
```
