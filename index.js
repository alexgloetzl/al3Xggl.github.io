<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Family Tree</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f4f4f9;
        }
        .family-tree {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .generation {
            display: flex;
            justify-content: center;
            margin: 20px 0;
            position: relative;
        }
        .person {
            margin: 0 15px;
            text-align: center;
            position: relative;
        }
        .line {
            border-top: 2px solid #333;
            width: 40px;
            margin: 0 auto;
        }
        .connection {
            position: absolute;
            border: 2px solid #333;
            height: 20px;
            width: 2px;
            background-color: #333;
        }
        .horizontal {
            height: 2px;
            width: 50px;
            border: none;
        }
    </style>
</head>
<body>
    <div class="family-tree" id="familyTree">
        <!-- Family tree will be dynamically generated here -->
    </div>

    <script>
        const familyData = [
            { name: "Grandfather", generation: 1 },
            { name: "Grandmother", generation: 1 },
            { name: "Father", generation: 2, parents: ["Grandfather", "Grandmother"] },
            { name: "Mother", generation: 2 },
            { name: "Child 1", generation: 3, parents: ["Father", "Mother"] },
            { name: "Child 2", generation: 3, parents: ["Father", "Mother"] },
            { name: "Child 3", generation: 3, parents: ["Father", "Mother"] }
        ];

        function createFamilyTree(data) {
            const treeContainer = document.getElementById('familyTree');

            const generations = {};

            // Group members by generation
            data.forEach(person => {
                if (!generations[person.generation]) {
                    generations[person.generation] = [];
                }
                generations[person.generation].push(person);
            });

            Object.keys(generations).forEach(generation => {
                const genDiv = document.createElement('div');
                genDiv.className = 'generation';

                generations[generation].forEach(member => {
                    const personDiv = document.createElement('div');
                    personDiv.className = 'person';
                    personDiv.innerHTML = `<p>${member.name}</p>`;

                    genDiv.appendChild(personDiv);
                });

                treeContainer.appendChild(genDiv);
            });

            // Add connections
            data.forEach(person => {
                if (person.parents) {
                    person.parents.forEach(parentName => {
                        const parent = document.querySelector(`.person p:contains('${parentName}')`);
                        const child = document.querySelector(`.person p:contains('${person.name}')`);

                        if (parent && child) {
                            const connection = document.createElement('div');
                            connection.className = 'connection';
                            parent.appendChild(connection);
                        }
                    });
                }
            });
        }

        createFamilyTree(familyData);
    </script>
</body>
</html>
