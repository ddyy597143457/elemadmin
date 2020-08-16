<template>
    <div class="">

        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="addRole">添加角色</el-button>
            </el-form-item>
        </el-form>

        <el-table
        :data="tableData"
        border
        style="width: 100%;"
        max-height="400"
        >
            <el-table-column
            prop="id"
            label="ID"
            width="200">
            </el-table-column>

            <el-table-column
                prop="name"
                label="角色名称"
            >
            </el-table-column>

            <el-table-column
            prop="date"
            label="添加日期"
            width="300">
            </el-table-column>

            <el-table-column
            fixed="right"
            label="操作"
            width="200"
            >
            <template slot-scope="scope" style="text-align: center">
                <template v-if="scope.row.type=='1'">
                </template>
                <template v-else>
                    <el-button size="small" type="primary">编辑</el-button>
                    <el-button size="small" type="danger" style="float:right">删除</el-button>
                </template>
                
            </template>
            </el-table-column>
        </el-table>

        <div style="margin-top:20px;text-align: center">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        prev-text="上一页"
        next-text="下一页"
        @current-change="curChange"
        >
        </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Administrators',
    data() {
        return {
            tableData:[
                {
                    id:1, 
                    name:'超级管理员', 
                    type:1,
                    status:1,
                    date: '2020-08-01 12:12:12'
                },
                {
                    id:2, 
                    name:'内容管理员', 
                    type:2,
                    status:1,
                    date: '2020-08-01 12:12:12'
                },
                {
                    id:3, 
                    name:'产品管理员', 
                    type:2,
                    status:2,
                    date: '2020-08-01 12:12:12'
                }
            ],
            page:1,
            per_page: 5,
            total:0,
        }
    },
    methods: {
        addRole() {
            this.$router.push('/role/add');
        }
    }
}
</script>
