import { request } from "express";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";


export const validateId = (req, res, next) => {
const {productId} = req.params;
if(!isValidObjectId(productId)) {
throw createHttpError (400, 'Bad request');
}
next();
};
