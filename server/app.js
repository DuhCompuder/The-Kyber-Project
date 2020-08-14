require('dotenv').config()
const koa = require('koa')
const Router = require('koa-router')
const json = require('koa-json')
const serve = require('koa-static')
const render = require('koa-ejs')
const path = require('path')
const views = require('koa-views')

const server = new koa()
const router = new Router()

// Authentication
// 3Box
const authenticate = require('./authentication')
// Storage
// Textile
const persist = require('./textileRoute')
// Contract interaction
const readContract = require('./ethquery')
const writeContract = require('./ethwrites')




const PORT = parseInt(process.env.PORT, 10) || 3000;

// server.use(serve('.'))
server.use(serve('./views'))
server.use(serve('./public/css'))
//server.use(serve('./public/img'))

// server.use(json())

server.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        console.log(err.status)
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
})

server.use(views('./views', { map: { html: 'nunjucks' }}))

// render(server, {
//     root: path.join(__dirname, 'views'),
//     layout: 'welcome',
//     viewExt: 'html',
//     cache: false,
//     debug: true
// })

// router.get('/', (ctx) => {
//     ctx.sendFile(__dirname + '/views/welcome.html')
//     //ctx.body = "Welcome to tsdsdhe Jungle.";
// })

router.get('/', (ctx) => {
    return ctx.render('./welcome')
    //ctx.throw('Test Error Message', 500)
})

server.use(router.routes())
    .use(router.allowedMethods())

server.listen(PORT, 'localhost', ()=> console.log('Server started!'));



/*

const Task = require('../models/Task')

router.get('/api/tasks', async ctx => {
    await Task.find()
        .then(task => {
            ctx.body = tasks
        })
        .catch(err => {
            ctx.body = 'error: ' + err
        })
})

router.post('/api/tasks', async ctx => {
    if(!ctx.request.body.task_name){
        ctx.body = {
            error: 'Bad Data'
        }
    }else{
        var task = new Task()
        task.task_name = ctx.request.body.task_name
        await task.save()
        .then(data => {
            ctx.body = data
        })
        .catch(err => {
            ctx.body = 'error: ' + err
        })
    }
})

router.delete('/api/tasks/:id', async ctx => {
    await Task.deleteOne({
        _id: ctx.params.id
    })
        .then(() => {
            ctx.body = { status: 'Task Deleted' }
        })
        .catch(err => {
            ctx.body = 'error: ' + err
        })
})

router.put('/api/tasks/:id', async ctx => {
    if(!ctx.request.body.task_name){
        ctx.body = {
            error: 'Bad Data'
        }
    }else{
        await Task.findOneAndUpdate(
            {_id: ctx.params.id},
            {task_name:ctx.request.body.task_name}
        )
        .then(() => {
            ctx.body = {status: 'Task Updated!'}
        })
        .catch(err => {
            ctx.body = 'error: ' + err
        })
    }
})

module.exports = router

*/