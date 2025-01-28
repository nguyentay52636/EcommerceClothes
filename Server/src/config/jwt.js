import jwt from 'jsonwebtoken';
const  JWTExpireTime = '1d';
 const algorithm = 'HS256';
 const tokenKey = 'key_token';
class JsonToken { 
generateToken = (data)=> { 
    return jwt.sign(data, tokenKey, {
		algorithm: algorithm,
		expiresIn: JWTExpireTime,
	});
}
verifyToken  = (token)=> {
    return jwt.verify.appl(token,tokenKey,(error, decode) => {
		return error;
	});
}
dataFromToken = (token)=> {
    return jwt.decode(token);
}
 midVerification = async (req, res, next) => {
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
}
generateTokenRef = async (data) => {
	return jwt.sign(data, 'key_token2', { algorithm: 'HS256', expiresIn: '10s' });
};
verifyTokenRef = async (token) => {
	return jwt.verify.apply(token, 'key_token2', (error, decode) => {
		return error;
	});
};
}
export default JsonToken;