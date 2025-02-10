import jwt from 'jsonwebtoken';
import { responseApi } from '../config/respone.js';

let createToken = (user) => {
	return jwt.sign({
		userId: user._id,
		role: user.role,
		status: user.accountStatus,
	}, 'key_token', {
		algorithm: 'HS256',
		expiresIn: '10d',
	});
};
const checkToken = async (token) => {
    try {
        return jwt.verify(token, 'key_token');
    } catch (error) {
        return null;
    }
};
let dataToken = (token) => {
	return jwt.decode(token);
};
const midVerification = async (req, res, next) => {
	let token =
		req.headers['x-access-token'] ||
		req.body.token ||
		req.query.token ||
		req.cookies.token;
	if (token) {
		jwt.verify(token, 'key_token', (err, decoded) => {
			if (err) {
				return responseApi(res, 400, '', 'Token không hợp lệ');
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return responseApi(res, 400, '', 'Token không hợp lệ');
	}
};
const createTokenRef = async (user) => {
	return jwt.sign({
		userId: user._id,
		role: user.role,
		status: user.accountStatus,
	}, 'key_token2', { algorithm: 'HS256', expiresIn: '7d' });
};
const checkTokenRef = async (token) => {
	return jwt.verify(token, 'key_token2', (error, decode) => {
		return error;
	});
};
export {
	createToken,
	checkToken,
	dataToken,
	midVerification,
	createTokenRef,
	checkTokenRef,
};