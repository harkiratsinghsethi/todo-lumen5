const fs = require('fs');

module.exports = {
    updateLogin: (req, res) => {
        const fileName = '../../../data/users.json';
        const file = require(fileName);
        file.isLogin = true;
        fs.writeFile("data/users.json", JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
            res.status(200).send('success');

        });

    },
    addProject: (req, res) => {
        const projectName = req.query.projectname
        const todo = []
        const jsonObject = {};
        const tags = {
            "id": Math.floor(100000 + Math.random() * 900000).toString(),
            "user_id": "user_12231",
            "name": "admin"
        }
        const todos = []
        todos.push({
            "id": Math.floor(1000000000 + Math.random() * 9000000000).toString(),
            "project_id": tags.id,
            "title": "default",
            "description": "default",
            "state": "TODO",
            "due_date": new Date("05-05-2021")
        })
        jsonObject.project = projectName
        jsonObject.tags = tags
        jsonObject.todos = todos
        try {
            const rawdata = fs.readFileSync('data/admin/project.json')
            const json = JSON.parse(rawdata);
            json.push(jsonObject);
            const data = JSON.stringify(json, null, '\n');
            fs.writeFileSync('data/admin/project.json', data);
            res.status(200).send('success');

        } catch (e) {
            res.status(500).send('failure');
        }

    },
    deleteProject: (req, res) => {

        const removeProjectID = req.query.projectid;
        const data = fs.readFileSync('data/admin/project.json');
        let json = JSON.parse(data);
        json = json.filter((project) => {
            return project.tags.id !== removeProjectID
        });
        try {
            fs.writeFileSync('data/admin/project.json', JSON.stringify(json, null, 2));
            res.status(200).send('success');
        } catch (e) {
            res.status(500).send('failure');
        }

    },
    updateProject: (req, res) => {
        const editProjectID = req.query.projectid;
        const editProjectName = req.query.newprojectname;

        const data = fs.readFileSync('data/admin/project.json');
        let json = JSON.parse(data);

        json.forEach(project => project.tags.id === editProjectID ? project.project = editProjectName : project);
        try {
            fs.writeFileSync('data/admin/project.json', JSON.stringify(json, null, 2));
            res.status(200).send('success');
        } catch (e) {
            res.status(500).send('failure');
        }
    },
    fetchToDos: (req, res) => {
        const projectid = req.query.projectid;
        const data = fs.readFileSync('data/admin/project.json');
        let json = JSON.parse(data);
        json = json.filter((project) => {
            return project.tags.id === projectid
        });

        const todos = json[0].todos.map(item => item)
        res.status(200).send(todos);

    },

    updateTodo: (req, res) => {
        const projectid = req.query.projectid;
        const todoid = req.query.todoid;


    },
    deleteTodo: (req, res) => {
        const projectid = req.query.projectid;
        const todoid = req.query.todoid;

        const data = fs.readFileSync('data/admin/project.json');
        let json = JSON.parse(data);

        const finalData = json
            .map((item) => {
                item.todos = item.todos.filter((itemValue) => {
                    return itemValue.id !== todoid;
                });
                return item;
            })

        try {
            fs.writeFileSync('data/admin/project.json', JSON.stringify(finalData, null, 1));
            res.status(200).send('success');
        } catch (e) {
            res.status(500).send('failure');
        }
    },

    getProjects: (req, res) => {

        try {
            const data = fs.readFileSync('data/admin/project.json');
            let json = JSON.parse(data);
            res.status(200).send(json);

        } catch (e) {
            res.status(500).send('failure');

        }


    },
    addTodo: (req, res) => {
        const todo = req.query.todo;
        const projectid = req.query.projectid;
        const category = req.query.category;
        const data = fs.readFileSync('data/admin/project.json');
        let json = JSON.parse(data);
        let newTodo = {
            "id": Math.floor(1000000000 + Math.random() * 9000000000).toString(),
            "project_id": projectid,
            "title": todo,
            "description": "default",
            "state": "TODO",
            "due_date": new Date("05-05-2021"),
            "category":category
        }
        json.forEach(project => project.tags.id === projectid ? project.todos.push(newTodo) : project)
        try {
            fs.writeFileSync('data/admin/project.json', JSON.stringify(json, null, 1));
            res.status(200).send('success');
        } catch (e) {
            res.status(500).send('failure');
        }
    },
    registerUser: (req, res) => {
        const username = req.query.username;
        const password = req.query.password
        const data = fs.readFileSync('data/users.json');
        let json = JSON.parse(data);
        json.push({"username": username, "password": password, "isLogin": false})
        try {
            fs.writeFileSync('data/users.json', JSON.stringify(json, null, 1));
            res.status(200).send('success');
        } catch (e) {
            res.status(500).send('failure');
        }

    },
    checkLogin: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const data = fs.readFileSync('data/users.json');
        let json = JSON.parse(data);
        const value = json.map(item => {
                if (item.username === username && item.password === password) {
                    return true
                }
            }
        )
        res.status(200).send(value.includes(true))
    }
}
