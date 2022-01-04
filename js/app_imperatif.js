/**
 * Todolist
 */
const app = {
    // il y a un risque que le DOM ne soit pas encore chargé, et donc la div pas
    // accessible => OK si on met dans app.init, car exécuté après l'événement
    // DOMContentLoaded
    // container: document.getElementById('todo'),

    init: function() {
        // on réutilise container plusieurs fois => stockage
        app.container = document.getElementById('todo');

        // création de chaque bloc => 3 fonctions
        app.createForm();
        app.createCounter();
        app.createListTasks();
    },

    // méthode qui a la responsabilité de créer le formulaire
    createForm: function() {
        const form = document.createElement('form');
        // 2 syntaxes possibles : changer directement l'attribut ou passer par setAttribute
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

    // méthode qui a la responsabilité de créer le compteur de tâches
    createCounter: function() {
        app.counter = document.createElement('div');
        app.counter.className = 'counter';
        app.setCounterValue();

        app.container.appendChild(app.counter);
    },

    // méthode qui a la responsabilité de donner la valeur au compteur de tâches
    setCounterValue() {
        const count = document.querySelectorAll('input[type="checkbox"]:not(:checked)').length;

        if (count <= 1) {
            app.counter.textContent = `${count} tâche en cours`;
        } else {
            app.counter.textContent = `${count} tâches en cours`;
        }
    },

    // méthode qui a la responsabilité de créer la liste des tâches
    createListTasks: function() {
        app.ul = document.createElement('ul');
        app.container.appendChild(app.ul);
    },

    handleSubmit: function(event) {
        // on empêche le comportement par défaut du formulaire (recharger la page)
        event.preventDefault();

        const newValue = event.target.childNodes[0].value;

        // on pourrait utiliser querySelector pour cibler l'input
        // on pourrait utiliser event.target.firstChild.value

        app.generateTask(newValue);

        // on vide l'input
        event.target.childNodes[0].value = '';

        // mise à jour du nombre de tâches
        app.setCounterValue();
    },

    generateTask: function(taskLabel) {
        const li = document.createElement('li');
        li.className = 'taskContainer';
        // li.className = 'taskContainer';

        // objectif : associer le label à l'input => meilleure accessibilité, et
        // quand on clique sur le label ça agit sur la checkbox
        // - soit utiliser for (avec un id sur l'input)
        // - soit placer l'input dans le label

        const id = `checkbox-${taskLabel}`;

        // créer un input et un label
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = id;
        checkbox.className = 'checkbox';
        checkbox.addEventListener('change', app.handleCheckboxChange);

        const label = document.createElement('label');
        label.textContent = taskLabel;
        // label.setAttribute('for', id);
        label.htmlFor = id;
        label.className = 'label';

        li.appendChild(checkbox);
        li.appendChild(label);

        app.ul.appendChild(li);
    },

    handleCheckboxChange: function(event) {
        const checkbox = event.currentTarget;
        // closest : trouver l'ancêtre le plus proche qui correspond au sélecteur
        const task = checkbox.closest('li');
        // autre possibilité : récupérer le noeud parent
        // const task = checkbox.parentElement;
        task.classList.toggle('taskContainer--done');

        // mise à jour du nombre de tâches
        app.setCounterValue();
    }
};


// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);