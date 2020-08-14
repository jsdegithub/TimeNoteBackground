const Router = require('koa-router');
const { Flow } = require('../../models/flow');
const { Favor } = require('@models/favor');

const router = new Router({
    prefix: '/v1/classic'
});

const { PositiveIntegerValidator, ClassicValidator } = require('../../validators/validator');
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
    const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
    // art.dataValues.index = flow.index;
    art.setDataValue('index', flow.index);
    art.setDataValue('like_status', likeLatest);
    ctx.body = art;
})


router.get('/:index/next', new Auth().m, async (ctx) => {
    const v = await new PositiveIntegerValidator().validate(ctx, { id: 'index' });
    const index = v.get('path.index');
    const flow = await Flow.findOne({
        where: {
            index: index + 1
        }
    })
    if (!flow) {
        throw new global.errs.NotFound();
    }
    const art = await Art.getData(flow.art_id, flow.type);
    const likeNext = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
    art.setDataValue('index', flow.index);
    art.setDataValue('like_status', likeNext);
    ctx.body = art;
})


router.get('/:index/previous', new Auth().m, async (ctx) => {
    const v = await new PositiveIntegerValidator().validate(ctx, { id: 'index' });
    const index = v.get('path.index');
    const flow = await Flow.findOne({
        where: {
            index: index - 1
        }
    })
    if (!flow) {
        throw new global.errs.NotFound();
    }
    const art = await Art.getData(flow.art_id, flow.type);
    const likePrevious = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);
    art.setDataValue('index', flow.index);
    art.setDataValue('like_status', likePrevious);
    ctx.body = art;
})


router.get('/:type/:id/favor', new Auth().m, async (ctx) => {
    const v = await new ClassicValidator().validate(ctx);
    const id = v.get('path.id');
    const type = parseInt(v.get('path.type'));
    const art = await Art.getData(id, type);
    if (!art) {
        throw new global.errs.NotFound();
    }
    const like = await Favor.userLikeIt(id, type, ctx.auth.uid);
    ctx.body = {
        fav_nums: art.fav_nums,
        like_status: like
    }
})





module.exports = router;