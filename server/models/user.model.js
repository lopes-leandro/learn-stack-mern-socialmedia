import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Nome é obrigatório.'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email informado já existe.',
        match: [/.+\@.+\..+/, 'Por favor, informe um email válido.'],
        required: 'Email é obrigatório.'
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: Date,
    hashed_password: {
        type: String,
        required: 'Password é obrigatório.'
    },
    salt: String,
    about: {
        type: String,
        trim: true
    }
});

UserSchema.methods = {
    authenticate: function (textoSimples) {
        return this.encryptPassword(textoSimples) === this.hashed_password;
    },
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha256', this.salt)
                .update(password)
                .digest('hex')
        } catch (err) {
            return '';
        }
    },
    makeSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + 'G@THAM';
    }
}

UserSchema.virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function(){
        return this._password
    });

UserSchema.path('hashed_password').validate(function(value) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'A senha deve ter pelo menos 6 caracteres.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'A senha é obrigatória.')
    }
}, null);

export default mongoose.model('User', UserSchema);