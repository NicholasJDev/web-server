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

import {MongoClient, ServerApiVersion} from 'mongodb';
import {config} from "dotenv";

config()
let _database;
export const initializeDb = (callback) => {
    if (_database) {
        console.log("Db is already set and ready to work")
        return callback(null, _database)
    }
    MongoClient.connect(process.env.DB_URI, {serverApi: ServerApiVersion.v1})
        .then(client => {
            _database = client;
            callback(null, _database)
        }).catch(err => {
        callback(err);
    })
}


export const getClient = () => {
    if(_database)
        return _database;
    throw Error("Database isn't ready.")
}
