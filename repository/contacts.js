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

import {getClient} from "../mongoTemplate/MongoRepository.js";

const getCollection = () => {
    return getClient().db("Node_Application").collection('ContactService')
}

export const getAll = async () => {
    let collection = getCollection();
    return await collection.find().toArray().then(list => list)
}

export const getContactById = async (userId) => {
    let collection = getCollection();
    return await collection.findOne({_id: userId})
}

export const postContact = async (user) => {
    let collection = getCollection()
    return await collection.insertOne(user)
}
export const postContacts = async (listUsers) => {
    let collection = getCollection()
    return await collection.insertMany(listUsers)
}

export const deleteContact = async (userId) => {
    let collection = getCollection()
    return await collection.deleteOne({_id: userId})
}

export const deleteContacts = async (listUserId) => {
    let collection = getCollection()
    return await collection.deleteMany({_id: {$in: listUserId}})
}

export const putContact = async (user) => {
    let collection = getCollection()
    return await collection.replaceOne({_id: user._id}, user)
}

