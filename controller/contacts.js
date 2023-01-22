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
import {createContact, getAllRecords, getContactsById, removeContact, updateContact} from "../services/contacts.js";

export const getAll = async (req, res) => {
    getAllRecords().then(list => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(list)
    });
};

export const getContactById = async (req, res) => {
    getContactsById(req).then(record => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(record);
    });
};
export const createUser = async (req, res) => {
    return await createContact(req).then(response => {
        res.setHeader('Content-Type', 'application/json')
        response.acknowledged ? res.status(201).json(response)
            : res.status(500).json(response.errmsg || 'Unexpected behavior occurred during creation.')
    });
};

export const deleteUser = async (req, res) => {
    removeContact(req).then(response => {
        res.setHeader('Content-Type', 'application/json')
        response.deletedCount > 0 ? res.status(204).send()
            : res.status(500).json(response.errmsg || 'Unexpected behavior occurred during deletion operation.')
    });
};

export const updateUser = async (req, res) => {
    updateContact(req).then( response => {
        res.setHeader('Content-Type', 'application/json')
        response.modifiedCount > 0 ? res.status(204).send()
            : res.status(500).json(response.errmsg || 'Unexpected behavior occurred during deletion operation.')
    });
};