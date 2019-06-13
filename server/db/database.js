"use strict";

const chalk = require("chalk");
const Sequelize = require("sequelize");
const pkg = require("../../package.json");

console.log(chalk.yellow("Opening db connection"));

const db = new Sequelize(`postgres://localhost:5432/${pkg.name}`, {
  logging: false
});

module.exports = db;
