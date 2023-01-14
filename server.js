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

import "DotEnv"
import e, {urlencoded} from "express";
import {initializeDb} from "./mongoTemplate/MongoRepository.js";
import {gateway} from "./routes/gateway.js";
import bodyParser from "body-parser";

const application = e()
const port = process.env.PORT || 8080

application
    .use(bodyParser.json())
    .use(urlencoded({extended: true}))
    .use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*')
       next()
     })
    .use(gateway)

initializeDb((err, mongodb) => {
    if(err){
        console.log(err)
    }
})

application.listen(port, ()=> {
    console.log(`Application listens on port ${port}`)
})
