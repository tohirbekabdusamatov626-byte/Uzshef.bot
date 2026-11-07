const { Prisma } = require('@prisma/client')
const { Telegraf, Markup } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
  ctx.reply(`Welcome ${ctx.from.first_name} to my frist bot`,
    Markup.keyboard([
      Markup.button.contactRequest('Telefon nomeringizni kiriting ?!')
    ]).resize().oneTime()
  )
})

bot.help(ctx => ctx.reply('Yordam berish taqiqlanadi !?'))

const exsist = await prisma.user.find.Unique({ where: { phone: ctx.message.contact.phone_number } })

if (exsist)
  return ctx.reply("Are you creazy ?!",
    Markup.inlineKeyboard([
      [Markup.button.url('1 chi sayt', 'https://www.chess.com/play')]
      [Markup.button.callback('obuna boldim', 'done')],
    ]))

await prisma.user.create({ data: { name: ctx.from.first_name, phone: ctx.message.contact.phone_number } })
ctx.reply("Muvafaqiyatli royhatdan o'tdingiz ?!",
  Markup.inlineKeyboard([
    [Markup.button.url('1 chi sayt', 'https://www.chess.com/play')]
    [Markup.button.callback('obuna boldim', 'done')],
  ]))

bot.action('dane', async ctx => {
  await ctx.answerCbQuery()
  const member = await ctx.telegram.getChatMember('@Uzshef_bot', ctx.from.id)
  console.log(member)
  const isMember = ['creator', 'administrator', 'member'].includes(member.status) ||
    (member.status === 'restricted' && member.is_member)

  if (!isMember)
    return ctx.reply("Avvalgi kanalga obuna bo'ling ?!")
  return ctx.reply("Obuna bolganingiz tekshirildi ?!")

})

bot.hears('Salomlashish', ctx => {
  ctx.reply(`Salom ${ctx.from.first_name}`)
})


module.exports = bot

