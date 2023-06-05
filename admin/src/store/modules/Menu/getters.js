const sideMenu = (state) => {
	let cate_1st = state.menus.filter((item) => item.pId === 1);
	//转换为树形结构
	const parseToTree = function (list) {
		return list.map((parent) => {
            // 有没有子菜单
			let children = state.menus.filter((child) => child.pId === parent.id);

			if (children.length) {
				return { ...parent, children: parseToTree(children) }
			} else {
				return { ...parent }
			}
		});
	}
	//深拷贝，防止修改原始数组
	return parseToTree(cate_1st);
}

export default {
	
	sideMenu,
}
