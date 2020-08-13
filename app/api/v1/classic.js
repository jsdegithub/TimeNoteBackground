const Router = require('koa-router');
const { Flow } = require('../../models/flow');

const router = new Router({
    prefix: '/v1/classic'
});

const { PositiveIntegerValidator } = require('../../validators/validator');
const { Auth } = require('../../../middlewares/auth');

const { HttpException, ParameterException } = require('../../../core/http-exception');
const { Art } = require('../../models/art');

router.get('/latest', new Auth().m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    const art = await Art.getData(flow.art_id, flow.type);
    // art.dataValues.index = flow.index;
    art.setDataValue('index', flow.index);
    ctx.body = art;
})

module.exports = router;