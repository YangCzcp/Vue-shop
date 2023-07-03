const sideMenu = (state) => {

    // cate_1st ====一级分类
    // state.menu  -====所有分类

	let cate_1st = state.menu.filter((item) => item.pId === 1);
	//转换为树形结构
	const parseToTree = function (list) {
		return list.map((parent) => {
            // 有没有子菜单
			let children = state.menu.filter((child) => child.pId === parent.id);

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
