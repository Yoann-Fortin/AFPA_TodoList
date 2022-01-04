/*
Programmation impérative : on stocke les données directement dans le DOM.

Pas pratique pour ajouter des fonctionnalités, il faut parfois modifier une
fonctionnalité existante pour en ajouter une nouvelle.

Programmation déclarative :
    - une seule source de vérité : les données
    - quand on veut changer quelque chose  (par exemple traiter une action utilisateur) on modifie les données
    - dès que les données changent, on reconstruit complètement l'affichage à partir des données

Avantages et inconvénients :
    - impératif : on met à jour dans le DOM seulement ce qui a changé... Mais peu évolutif
    - déclaratif : évolutif, mais on recharge tout le DOM (bof pour la performance)
*/

const app = {
    // données : seule source de vérité
    tasks: [],

    init: function() {
        // On cible la balise html pour commencer la construction du DOM
        app.container = document.getElementById('todo');

        // Puis on vide l'affichage au cas où
        app.container.innerHTML = '';

        // Enfin, création de chaque bloc => 3 fonctions
        app.createForm();
        app.createCounter();
        app.createListTasks();
    },

    createForm: function() {
        const form = document.createElement('form');
        form.className = 'form-addTask';
        // form.setAttribute('class', 'form-addTask');
        // on écoute l'événement submit, et quand il se produit on appelle app.handleSubmit
        form.addEventListener('submit', app.handleSubmit);

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Ajouter une tâche';
        input.className = 'input-addTask';
        form.appendChild(input);

        app.container.appendChild(form);
    },

    createCounter: function() {
        app.counter = document.createElement('div');
        app.counter.className = 'counter';
        app.setCounterValue();

        app.container.appendChild(app.counter);
    },

    setCounterValue() {
        // on récupère les tâches en cours
        // const notDoneTasks = app.tasks.filter((task) => {
        //   // on retourne true si on veut garder l'élément, false sinon
        //   // if (task.done) {
        //   //   return false;
        //   // }
        //   // return true;
        //   return !task.done;
        // });

        // écrit en raccourci
        // const notDoneTasks = app.tasks.filter((task) => task.done === false);
        const notDoneTasks = app.tasks.filter((task) => !task.done);

        // on compte les tâches en cours
        const count = notDoneTasks.length;

        /*if (count <= 1) {
            app.counter.textContent = `${count} tâche en cours`;
        } else {
            app.counter.textContent = `${count} tâches en cours`;
        }*/

        // La même condition écrite avec une ternaire, moins lisible mais évite la duplication de code
        app.counter.textContent = `${count} tâche${(count > 1 ? 's' : '')} en cours`;


    },

    createListTasks: function() {
        app.ul = document.createElement('ul');
        app.container.appendChild(app.ul);

        // afficher les tâches du tableau tasks
        app.tasks.forEach((task) => {
            app.generateTask(task.title, task.done, task.id);
        });
    },

    generateTask: function(taskLabel, isDone, taskId) {
        const li = document.createElement('li');

        let className = 'taskContainer';
        if (isDone) {
            className += ' taskContainer--done';
        }
        li.className = className;

        const id = `
            checkbox - $ { taskId }
            `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;
        checkbox.checked = isDone;
        checkbox.className = 'checkbox';
        checkbox.addEventListener('change', app.handleCheckboxChange);

        // on ajoute l'id de la tâche pour pouvoir le récupérer avec l'événement change
        checkbox.dataset.identifier = taskId;

        const label = document.createElement('label');
        label.textContent = taskLabel;
        label.htmlFor = id;
        label.className = 'label';

        li.appendChild(checkbox);
        li.appendChild(label);

        app.ul.appendChild(li);
    },

    handleSubmit: function(event) {
        // on empêche le comportement par défaut du formulaire (recharger la page)
        event.preventDefault();

        const newValue = event.target.childNodes[0].value;
        // console.log(newValue);

        // créer une nouvelle tâche dans le tableau tasks
        const newTask = {
            id: Date.now(),
            title: newValue,
            done: false,
        };
        app.tasks.push(newTask);

        // on reconstruit l'affichage
        app.init();

        // app.generateTask(newValue);

        // on vide l'input
        event.target.childNodes[0].value = '';
    },

    handleCheckboxChange: function(event) {
        const id = Number(event.target.dataset.identifier);

        // trouver la tâche dans app.tasks et changer son état
        const taskToUpdate = app.tasks.find((task) => task.id === id);
        taskToUpdate.done = !taskToUpdate.done;

        // on reconstruit l'affichage
        app.init();
    }
};

// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);