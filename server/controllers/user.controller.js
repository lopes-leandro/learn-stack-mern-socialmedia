import User from './../models/user.model';
import errorHandler from './../helpers/dbErrorHandler';
import { extend } from 'lodash';
import formidable from "formidable";
import fs from "fs";
import defaultAvatar from "./../../client/assets/images/defaultAvatar.jpg";

const create = async (req, res, next) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).json({
            message: 'Cadastrado realizado com sucesso!'
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}
const list = async (req, res) => {
    try {
        let users = await User.find().select('name about email photo updated created');
        res.json(users);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}
const userById = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec();
        if (!user) {
            return res.status(400).json({
                error: 'Usuário não encontrado.'
            });
        }
        req.profile = user;
        next();
    } catch (err) {
        return res.status(400).json({
            error: 'Não foi possível recuperar o registro solicitado.'
        });
    }
}
const read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}
const update = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async(err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "A imagem não pode ser carregada."
            });
        }
        let user = req.profile;
        // mescla os dados do banco de dados com 
        // os dados que vieram da request
        user = extend(user, req.body); 
        user.updated = Date.now();
        
        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }

        try {
            await user.save();
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            });
        }    
    });
}
const remove = async (req, res, next) => {
    try {
        let user = req.profile;
        let deleteUser = await user.remove();
        deleteUser.hashed_password = undefined;
        deleteUser.salt = undefined;
        res.status(200).json({message: 'Usuário removido com sucesso.'});
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const photo = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set("Content-Type", req.profile.photo.contentType);
        return res.send(req.profile.photo.data);
    }
    // caso não encontre uma foto carregada
    // o next() chamará defaultPhoto
    next();
}

const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd() + defaultAvatar);
}

const addFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId, 
            {$push: {following: req.body.followId}});
        next();
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const addFollower = async (req, res) => {
    try {
        let result = await User.findByIdAndUpdate(req.body.followId,
            {$push: {followers: req.body.userId}},
            {new: true})
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec()
        result.hashed_password = undefined;
        result.salt = undefined;
        res.json(result);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const removeFollowing = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.body.userId,
            {$pull: {following: req.body.unfollowId}});
        next();
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const removeFollower = async (req, res, next) => {
    try {
        let result = await User.findByIdAndUpdate(req.body.unfollowId,
            {$pull: {followers: req.body.userId}},
            {new: true})
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec();
        result.hashed_password = undefined;
        result.salt = undefined;
        res.json(result);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

export default { 
    create, 
    list, 
    userById, 
    read, 
    update, 
    remove, 
    photo, 
    defaultPhoto,
    addFollower,
    addFollowing,
    removeFollowing,
    removeFollower}