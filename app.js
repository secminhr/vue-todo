const app = {
	data() {
		return {
			items: JSON.parse(localStorage.getItem('todolist'))
		}
	},
	computed: {
	    doneItems() {
	      return this.items.filter(item => item.done);
	    }
	},
	methods: {
		addItem(itemName) {
			this.items.push({
				"name": itemName,
				"done": false
			});
			console.log(this.items);
		},
		deleteItem(item) {
			console.log(item);
			let index = this.items.indexOf(item);
			if (index != -1) {
				this.items.splice(index, 1);
			}
		},
		deleteAll() {
			this.items = [];
		},
		deleteDone() {
			this.items = this.items.filter(item => !item.done);
		}
	},
	watch: {
		items: {
			handler: (newItems) => {
				console.log('saving');
				console.log(newItems);
				localStorage.setItem('todolist', JSON.stringify(newItems));
			},
			deep: true
		}
	}
}

const newTaskRow = {
	template:`
		<div>
			<input type="text" placeholder="New Task" v-model="newTaskName"/>
			<button style="margin-left: 16px; text-align: center;" :disabled="disableButton" @click="add">+</button>
		</div>
	`,
	data() {
		return {
			newTaskName: ""
		}
	},
	computed: {
	    disableButton() {
	      return this.newTaskName == '';
	    }
	},
	methods: {
		add() {
			this.$emit('on-add', this.newTaskName);
			this.newTaskName = "";
		}
	}
}

const taskItem = {
	template: `
		<input type="checkbox" v-model="item.done">
			<del v-if="item.done" style="color: grey;"> {{ item.name }} </del>
			<del v-else style="text-decoration: none"> {{ item.name }} </del>
		</input>
		<button @click="deleteClick">delete</button>
	`,
	props: ['item'] ,
	methods: {
		deleteClick() {
			this.$emit('on-delete', this.item);
		}
	}
}


Vue.createApp(app)
	.component('new-task-row', newTaskRow)
	.component('task-item', taskItem)
	.mount('body');