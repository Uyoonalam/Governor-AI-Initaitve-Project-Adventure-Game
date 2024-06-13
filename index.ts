#!/usr/bin/env node

import chalk from "chalk"
import inquirer from "inquirer"
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'


const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))

let message = "Welcome to Mystical Adventures"

figlet(message, async (error, data) => {
  if (error) {
    console.log("Something went wrong...")
    console.dir(error)
    return
  }

  if (data) {
    let rainbowMessage = chalkAnimation.rainbow(data)
    await delay(7000)
    rainbowMessage.stop()
  } else {
    console.error("Failed to generate ASCII art.")
  }
})
console.log("\n")
await delay(1000)
await delay(7000)

interface PlayerStats {
  HP: number
  Attack: [number, number]
  Block: number
  Surrender: boolean
  Heal: [number, number]
}

interface BossStats1 {
  HP: number
  Attack: [number, number]
  Abilities: (player: PlayerStats) => void
}

interface BossStats2 {
  HP: number
  Attack: [number, number]
  Abilities: number
}

interface BossStats3 {
  HP: number
  Attack: [number, number]
}

interface BossStats4 {
  HP: number
  Attack: [number, number]
}

interface BossStats5 {
  HP: number
  Attack: [number, number]
  Abilities: (player: PlayerStats, bossAttack: number) => void
}

let playerName = await inquirer.prompt({
  name: "playerName",
  type: "input",
  message: "What is your name?"
})

console.log("\n")
console.log(chalk.green("Welcome", playerName.playerName))

async function menu() {
  const pickOption = await inquirer.prompt({
    name: "options",
    type: "list",
    choices: ["Play", "How to Play", "Quit"],
  })

  switch (pickOption.options) {
    case "Play":
      play()
      break
    case "How to Play":
      howToPlay()
      break
    case "Quit":
      quit()
      break
    default:
      console.log("Something went wrong")
      break
  }
}

menu()

async function howToPlay() {
  console.log("\n")
  console.log("This game is not completed yet and would be eventually updated :)")
  await delay(1000)
  console.log("Right now only 1 boss is available for now")
  await delay(4000)
  console.log("This game is full of adventures.")
  await delay(2000)
  console.log("You can select multiple bosses to fight.")
  await delay(2000)
  console.log("After each fight you can select an upgrade.")
  await delay(2000)
  console.log("You can choose to Attack, Block, Heal or surrender.")
  await delay(2000)
  console.log("You and the enemy both take turns one after another till HP of either one goes down to 0.")
  await delay(2000)
  console.log("If you want to you can check out all the stats of each boss, upgrade and player in Stats and/or in comments in the end of the file.")
  await delay(4000)
  console.log("\n")

  const selectToPlay = await inquirer.prompt({
    name: "play",
    type: "list",
    message: "Would you like to continue play",
    choices: ["Yes", "No"],
  })

  if (selectToPlay.play === "Yes") {
    play()
    await delay(2000)
  } else {
    quit()
  }
}

async function quit() {
  const confirmQuit = await inquirer.prompt({
    name: "confirm",
    type: "list",
    message: "Are you sure you want to quit",
    choices: ["Yes", "No"],
  })

  switch (confirmQuit.confirm) {
    case "Yes":
      console.log("Exiting Game......")
      await delay(2000)
      break
    case "No":
      menu()
      await delay(2000)
      break
    default:
      console.log("Something Went wrong")
      break
  }
}

function getRandomIntAttack(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const attackRange = [5, 12]

function getRandomIntBlock(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const blockRange = [0.5, 0.8]

function getRandomIntHeal(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const healRange = [0.7, 1.4]

async function surrender(): Promise<boolean> {
  let surrenderChoice = await inquirer.prompt({
    name: "surrender",
    type: "list",
    message: "Would you like to surrender?",
    choices: ["Yes", "No"],
  })

  switch (surrenderChoice.surrender) {
    case "Yes":
      return true
    case "No":
      return false
    default:
      console.log("Something went wrong")
      break
  }

  if (surrenderChoice.surrender === "Yes") {
    console.log("You surrendered.")
    await delay(2000)
    quit()
  } else {
    console.log("You continue fighting.")
    await delay(2000)
  }
  return false
}

class Player implements PlayerStats {
  HP: number = 100
  Attack: [number, number] = [getRandomIntAttack(5, 12), getRandomIntAttack(5, 12)]
  Block: number = getRandomIntBlock(.8, 1)
  Heal: [number, number] = [getRandomIntHeal(7, 14), getRandomIntHeal(7, 14)]
  Surrender: boolean = false
}

let bossDefeated: number = 0

async function play() {
  const selectBoss = await inquirer.prompt({
    name: "boss",
    type: "list",
    message: "Select a boss to fight",
    choices: ["Boss 1", "Boss 2", "Boss 3", "Boss 4", "Boss 5"],
  })

  switch (selectBoss.boss) {
    case "Boss 1":
      boss1()
      break
    case "Boss 2":
    console.log(chalk.green("This boss is not implemented yet.\nPlease wait."))
    await delay(1000)
    console.log(chalk.rgb(160,32,240)("\t\tUyoon alam :)"))
    await delay(2000)
    // boss2()
    play()
      break
    case "Boss 3":
      console.log(chalk.green("This boss is not implemented yet.\nPlease wait."))
      await delay(1000)
    console.log(chalk.rgb(160,32,240)("\t\tUyoon alam :)"))
    await delay(2000)
      // boss3()
      play()
      break
    case "Boss 4":
      console.log(chalk.green("This boss is not implemented yet.\nPlease wait."))
      await delay(1000)
    console.log(chalk.rgb(160,32,240)("\t\tUyoon alam :)"))
    await delay(2000)  
    // boss4()
    play()
      break
    case "Boss 5":
      if (bossDefeated < 2) {
        console.log(chalk.green("This boss is not implemented yet.\nPlease wait."))
        await delay(1000)
    console.log(chalk.rgb(160,32,240)("\t\tUyoon alam :)"))
        console.log(chalk.gray("Please defeat two bosses first"))
        await delay(2000)
        play()
      } else {
        boss5()
      }
      break
    default:
      console.log("Something went wrong")
      break
  }
}

class Boss1 implements BossStats1 {
  HP: number = 100
  Attack: [number, number] = [getRandomIntAttack(5, 10), getRandomIntAttack(5, 10)]
  Abilities: (player: PlayerStats) => void = this.boss1Heal

  boss1Heal(player: PlayerStats): void {
    if (Math.random() < 1 / 3) {
      const healAmount = getRandomIntHeal(4, 8)
      console.log("Boss 1 heals for", healAmount, "HP!")
      this.HP = Math.min(this.HP + healAmount, 100)
    }
  }
}

async function boss1() {
  const boss = new Boss1();
  let player = new Player();
  let gameOver = false;

  console.log(`\nYour HP: ${player.HP}, Boss HP: ${boss.HP}`);
  await delay(2000);
  while (!gameOver && !player.Surrender) {
    const playerAction = await inquirer.prompt({
      name: "action",
      type: "list",
      message: "What will you do?",
      choices: ["Attack", "Block", "Heal", "Surrender"],
    });

    switch (playerAction.action) {
      case "Attack":
        if (player.HP > 0) {
          const playerAttack = getRandomIntAttack(player.Attack[0], player.Attack[1]);
          await delay(1000);
          console.log(`You attack for ${playerAttack} damage!`);
          boss.HP -= playerAttack;
          await delay(1000);
          console.log(`Boss HP: ${boss.HP}`);
          await delay(1000)
        } else {
          console.log("You are incapacitated and cannot attack.");
        }
        break;
      case "Block":
        const blockChance = Math.random()
        if (blockChance < player.Block) {
          await delay(1000)
          console.log("You couldn't block the attack!")
        } else {
          const bossAttack = getRandomIntAttack(boss.Attack[0], boss.Attack[1])
          const blockedDamage = Math.floor(bossAttack * player.Block)
          await delay(1000)
          console.log(
            `Boss attacks for ${bossAttack} damage, you block ${blockedDamage} damage!`
          )
          player.HP -= bossAttack - blockedDamage
          await delay(1000)
          console.log(`Your HP: ${player.HP}`)
          await delay(1000)
          console.log(`Boss HP: ${boss.HP}`);
        }
        break

      case "Heal":
        const healAmount = getRandomIntHeal(player.Heal[0], player.Heal[1])
        console.log(`You heal for ${healAmount} HP!`)
        player.HP = Math.min(player.HP + healAmount, 100)
        await delay(1000)
        console.log(`Your HP: ${player.HP}`)
        await delay(1000)
        console.log(`Boss HP: ${boss.HP}`);
        break

      case "Surrender":
        gameOver = await surrender()
        break
    }

    if (player.HP <= 0) {
      gameOver = true
      let message2 = "You lost"
      console.log(message2)
    } else if (boss.HP <= 0) {
      gameOver = true
      let message1 = "You Win!"
      console.log(chalk.blue(message1))
      bossDefeated++
    }

    if (!gameOver && !player.Surrender) {
      const bossAttack = getRandomIntAttack(boss.Attack[0], boss.Attack[1])
      console.log(`Boss attacks for ${bossAttack} damage!`)
      await delay(1000)
      player.HP -= bossAttack
      console.log(`Your HP: ${player.HP}`)
      await delay(1000)
      console.log(`Boss HP: ${boss.HP}`);
      await delay(1000)
      boss.Abilities(player)
    }

    await delay(2000)
  }

  if (gameOver) {
    const playAgain = await inquirer.prompt({
      name: "playAgain",
      type: "list",
      message: "Would you like to play again?",
      choices: ["Yes", "No"],
    })

    switch (playAgain.playAgain) {
      case "Yes":
        play()
        break
      case "No":
        quit()
        break
      default:
        quit()
        break
    }
  }
}

function boss2() {
  // boss2()
}

function boss3() {
  // boss3()
}

function boss4() {
  // boss4()
}

function boss5() {
  // boss5()
}