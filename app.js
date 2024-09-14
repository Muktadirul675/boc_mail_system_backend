import express from 'express';
import nodemailer from 'nodemailer';
import * as fs from 'fs';

const app = express()
const mailer = nodemailer.createTransport({
    pool: true,
    host: "mail.mathntech.xyz",
    name:"MathNTech",
    port: 465,
    secure: true, // use TLS
    auth: {
        user: "blog@mathntech.xyz",
        pass: "math@n@tech#123",
    },
})
mailer.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("SMTP Mail Server is ready to send emails");
    }
});
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLIC_KEY)
// const handlebarOptions = {
//     viewEngine: {
//         extName: ".handlebars",
//         partialsDir: path.resolve('./templates'),
//         defaultLayout: false,
//     },
//     viewPath: path.resolve('./templates'),
//     extName: ".handlebars",
// }

// mailer.use('compile', hbs(handlebarOptions))

// const channels = supabase.channel('mails')
//     .on(
//         'postgres_changes',
//         { event: 'INSERT', schema: 'public', table: 'mail' },
//         async (payload) => {
//             var message = {
//                 from: {
//                     name: "MathNTech",
//                     address: "blog@mathntech.xyz",
//                 },
//                 to: payload.new.mailTo,
//             };
//             if (payload.new.type == 'addArticle') {
//                 let { data: article } = await supabase.from('articles').select('*').eq('id', payload.new.article).limit(1).single()
//                 message.subject = "New article on " + article.subject
//                 message.template = "newArticle"
//                 message.context = {
//                     title: article.title,
//                     subject: article.subject,
//                     coverImg: article.coverImg,
//                     name: payload.new.name,
//                     id:article.id,
//                     url: "https://mathntech.xyz/article/"+article.id,
//                 }
//             }
//             else if(payload.new.type == 'welcome'){
//                 message.subject = "Welcome to MathNTech!"
//                 message.template = "welcome"
//                 message.context = {
//                     user : payload.new.name
//                 }
//             }
//             else if(payload.new.type == 'newsletter'){
//                 message.subject = "MathNTech newsletter subscribed!"
//                 message.template = "newsletter"
//                 message.context = {
//                     user : payload.new.name
//                 }
//             }
//             console.log(payload.new.id,"Mail" + " ("+payload.new.type+") " + "processing to",payload.new.mailTo)
//             mailer.sendMail(message, (err, info) => {
//                 if (err) console.log("\t",payload.new.id,payload.new.mailTo," ("+payload.new.type+") " ,"Failed", err)
//                 else console.log("\t",payload.new.id,payload.new.mailTo," ("+payload.new.type+") " ,"Success", info.response)
//             })
//         }
//     )
//     .subscribe()

// emailjs.send(process.env.EMAILJS_SERVICE_ID,process.env.EMAILJS_TEMPLATE,{
//     user_email: 'muktadirul.05@gmail.com',
// }).then(
//     (response) => {
//       console.log('SUCCESS!', response.status, response.text);
//     },
//     (err) => {
//       console.log('FAILED...', err);
//     },
//   );

app.listen(3000, () => {
    console.log('Node Server engaged')
})

app.get('/', (req, res) => {
    res.send('Email service running!')
})

app.get('/nf',(req,res)=>{
    fs.writeFile('new.handlebar','<html></html>',function(err){
        console.log(err)
    })
    res.send('nf')
})