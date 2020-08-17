<template>
    <div class="role-name-wrap">
        当前授权角色：{{roleName}}
        <el-divider></el-divider>
        <el-tree
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
        </el-tree>
        <el-divider></el-divider>
        <div style="margin-top:30px;text-align:center;">
            <el-button @click="handleCloseParentDialog(null)">取 消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
        </div>
           
    </div>
</template>
<script>

export default {
    name: 'AuthRole',
    props:{
        roleName:String,
    },
    data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            treeData: [],
            };
    },
    methods:{
        handleCloseParentDialog() {
            this.$emit('closeparentdialog');
        },
        submitForm() {
            let keys = this.$refs.tree.getCheckedKeys()
            alert('选择的节点：'+keys.join(','));
        },
        getMenuData() {
            this.axios.get('/node/list').then((res)=>{
                let data = res.data.data;
                this.treeData = this.initTree(data);
            });
        },
        initTree(data) {
            for(let i=0;i<data.length;i++) {
                data[i].label = data[i].name;
                if(data[i].children) {
                    this.initTree(data[i].children);
                }
            }
            return data;
        }
    },
    mounted() {
        this.getMenuData();
    }
}
</script>
