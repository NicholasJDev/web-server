/*
 * Copyright (c) 2023 the original author or authors.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import {deleteContact, getAll, getContactById, postContact, putContact} from "../repository/contacts.js";
import {ObjectId} from "mongodb";

export const getAllRecords = async() => {
    return await getAll()
}

export const getContactsById = async(req) => {
    let objectId = new ObjectId(req.params.id);
    return await getContactById(objectId)
}

export const createContact = async (req) => {
    let reqBody = req.body
    validateUserContact(reqBody)
    return await postContact({
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        email: reqBody.email,
        favoriteColor: reqBody.favoriteColor,
        birthday: reqBody.birthday
    })
}

function validateUserContact(user) {
    if (validate(user.firstName) || validate(user.lastName) || validate(user.email) || validate(user.favoriteColor)
        || validate(user.birthday)) {
        throw Error("Please fiill all mandatory fields.")
    }
}

function validate(value) {
    return value === '' || value === 'undefined';
}

export const removeContact = async (req) => {
    let userId = new ObjectId(req.params.id)
    return await deleteContact(userId)
}

export const updateContact = async (req) => {
    let reqBody = req.body
    validateUserContact(reqBody)
    let userId = new ObjectId(req.params.id)

    return await putContact({
        id: userId,
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        email: reqBody.email,
        favoriteColor: reqBody.favoriteColor,
        birthday: reqBody.birthday
    })
}