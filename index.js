/*
Dicey Boy
Programmed by The Pagician
v1.0
Used for random dice rolls when doing any kind of table top RPG over discord
*/
const Discord = require('discord.js');
const client = new Discord.Client();
const {token, PREFIX} = require('./config.json');

client.on('ready', () =>{
    console.log('Roll Lad v1.0');
    console.log('Made by: The_Pagician');
    console.log('Starting up');

    client.user.setActivity('D&D', {type: 'PLAYING'});
})

client.login(token);

const roll = require('./roll.js');
client.on('message', roll);