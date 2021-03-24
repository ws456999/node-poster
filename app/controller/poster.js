'use strict';

const Controller = require('egg').Controller;

class PosterController extends Controller {
  async index() {
    const { ctx } = this;
    const {img} = await ctx.service.poster.generatePoster();

    ctx.body = img;
  }
}

module.exports = PosterController;
