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

import {Router} from "express";
import {contacts} from "./contacts.js";
import {main} from "./index.js";
import {readFile} from "fs/promises"
import swaggerUi from "swagger-ui-express";
import {fileURLToPath} from "url";
import {dirname, resolve} from "path";
export const gateway = new Router()

let directory = fileURLToPath(import.meta.url);
console.log(directory)
console.log("\n")
const file = resolve(dirname(directory),'../swagger.json')
let promise = import("../swagger.js");
console.log("Before reading file: " + file)
const swaggerJson =  await promise.then(async () => JSON.parse(await readFile(file)))

gateway.use(main)
gateway.use(contacts)
gateway.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
gateway.get('/health', (req, res) => {
        res.send("Application is working fine")
    }
);