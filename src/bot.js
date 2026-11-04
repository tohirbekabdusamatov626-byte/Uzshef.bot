const { Telegraf, Markup } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
  ctx.reply(`Welcome ${ctx.from.first_name} to my frist bot`,
    Markup.keyboard([
      ["Men haqimda", "Bot haqida"],
      ["To'liq ma'lumot"]
    ]).resize())
})

bot.help(ctx => ctx.reply('Yordam berish taqiqlanadi !?'))

bot.hears('Men haqimda', ctx => {
  ctx.reply(`Men ${ctx.from.first_name}, ${ctx.from.id}`)
})

bot.hears('Bot haqida', ctx => {
  ctx.reply(`Uzshef.bot milliy ta'omlar retseplarini topib beradi. ${ctx.botInfo.first_name},${ctx.botInfo.id} `)
})

bot.hears("To'liq ma'lumot", ctx => {
  ctx.reply(`Men ${ctx.from.first_name},${ctx.botInfo.first_name}`)
})




module.exports = bot

