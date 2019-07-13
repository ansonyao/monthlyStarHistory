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
		result: []
	})
}

export default { createFramework }