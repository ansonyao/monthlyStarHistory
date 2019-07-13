const uuidv4 = require('uuid/v4');

export const createFramework = (owner, name) => {
	return ({
		framework: {
			owner,
			name,
			id: uuidv4(),
        },
        loading: true,
        dataError: null,
        worked: 0,
        total: null,
		result: []
	})
}

export default { createFramework }