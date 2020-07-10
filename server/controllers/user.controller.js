import User from './../models/user.model';
import errorHandler from './../helpers/dbErrorHandler';
import lodash, { extend } from 'lodash';

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
        let users = await User.find().select('name about email updated created');
        res.json(users);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}
const userById = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);
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
    try {
        let user = req.profile;
        // mescla os dados do banco de dados com 
        // os dados que vieram da request
        user = extend(user, req.body); 
        user.updated = Date.now();
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
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

export default { create, list, userById, read, update, remove }