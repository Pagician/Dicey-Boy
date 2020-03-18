const Discord = require('discord.js');
const {PREFIX} = require('./config.json');

module.exports = function (msg){
    if(!msg.guild){
        console.log("DM: " + msg.author.username + ": " + msg.toString());
        return;
    }//end of preventing dm's from breaking bot
    if(msg.content.substring(0, 1) != PREFIX){
        return;
    }//makes sure that it only runs if the prefix is used
    try{
        var rollInfo = msg.content.replace(/ /g, '');
        rollInfo = rollInfo.substring(PREFIX.length).split("d", 2);
        var numDie = rollInfo[0];
        var modType = null;
        if(msg.content.includes('-')){
            rollInfo = rollInfo[1].split("-", 2);
            modType = true;
        } else{
            rollInfo = rollInfo[1].split("+", 2);
            modType = false;
        }//makes it work with negative modifiers
        
        var sizeDie = rollInfo[0];
        var modifier = rollInfo[1];
        var output = new Array(numDie);
        var sum = 0;
        if(numDie > 10){
            msg.reply("Too many dice");
            return;
        }//keeps numdie from being too big

        if(sizeDie > 100){
            msg.reply("Die too large");
            return;
        }//keeps sizeDie from being too big

        if(modifier > 100){
            msg.reply("Modifier too large");
            return;
        }//keeps modifier from being too to big

        if(modifier === undefined){
            modifier = 0;
        }//makes sure that modifier is defined

        sum = parseInt(sum);
        modifier = parseInt(modifier);
        for(var i = 0; i < numDie; i++){
            output[i] = Math.floor((Math.random() * sizeDie) + 1);
            output[i] = parseInt(output[i]);
            if(modType){
                sum += (output[i] - modifier);
            } else{
                sum += (output[i] + modifier);
            }
        }
        var result = new Discord.MessageEmbed()
            .setTitle("You Rolled a Die")
            .setDescription("Here are the results")
            .setColor("#457a3f")
            .addField("Die rolls", output)
            if(modType){
                result.addField("Modifier", "-" + modifier);
            }else {
                result.addField("Modifier", "+" + modifier);
            }
            result.addField("Sum", sum);            
        msg.reply(result);
    }
    catch(err){
        console.log(err);
        msg.reply("Please use proper format");
    }
}//end of file