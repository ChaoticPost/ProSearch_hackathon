import JobPost from '../models/Post.js';

export const create = async (req, res) => {
    try {
        const doc = new JobPost({
            title: req.body.title,
            description: req.body.description,
            costFrom: req.body.costFrom,
            costTo: req.body.costTo,
            leadTime: req.body.leadTime,
            location: req.body.location,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save();


        res.json(post);
    } catch (err) {
        console.log(err),
        res.status(500).json({
            message: 'Не удалось создать заказ',
        });

    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await JobPost.find().populate('user').exec();
        res.json(posts);
    } catch (err) {
        console.log(err),
        res.status(500).json({
            message: 'Не удалось найти заказы',
        });
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await JobPost.findOne({_id: postId});
        res.json(post);
    } catch (err) {
        console.log(err),
        res.status(500).json({
            message: 'Не удалось найти заказы',
        });
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        await JobPost.deleteOne({ _id: postId }).then(
            res.json({ success: true,})
        );
    } catch (err) {
        console.log(err),
        res.status(500).json({
            message: 'Не удалось найти заказы',
        });
    }
  };

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        await JobPost.updateOne({
            _id: postId
        },
        {
            title: req.body.title,
            description: req.body.description,
            costFrom: req.body.costFrom,
            costTo: req.body.costTo,
            leadTime: req.body.leadTime,
            location: req.body.location,
            tags: req.body.tags,
            user: req.userId,
        },)
        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err),
        res.status(500).json({
            message: 'Не удалось обновить статью',
        });
    }
}