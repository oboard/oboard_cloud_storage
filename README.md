# oboard临时存储云
采用Next.js

## API文档
### 1. 写入数据
#### 1.1. 接口地址
```
POST /api/push
```
#### 1.2. 请求参数
| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| key | string | 是 | 要写入的key |
| value | string | 是 | 要写入的数据 |

#### 1.3. 返回参数
| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| code | number | 状态码 |
| message | string | 提示信息 |

#### 1.4. 示例
##### 1.4.1. 请求
```
POST /api/push
```
```json
{
    "key": "test",
    "value": "hello world"
    }
    ```
##### 1.4.2. 返回
```json
{
    "code": 200,
    "message": "success"
}
```

### 2. 读取数据
#### 2.1. 接口地址
```
GET /api/get
```
#### 2.2. 请求参数
| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| key | string | 是 | 要读取的key |

#### 2.3. 返回参数
| 参数名 | 类型 | 说明 |
| --- | --- | --- |
| code | number | 状态码 |
| message | string | 提示信息 |
| data | string | 读取到的数据 |

#### 2.4. 示例
##### 2.4.1. 请求
```
GET /api/get?key=test
```
##### 2.4.2. 返回
```json
{
    "code": 200,
    "message": "success",
    "data": "hello world"
}
```

## 部署
### 1. 安装依赖
```
npm install
```
### 2. 启动服务
```
npm run start
```
### 3. 访问
```
http://localhost:3000
```

## 说明
### 1. 服务端口
默认端口为3000，可在根目录下的.env文件中修改
```
PORT=3000
```
### 2. 数据存储

数据存储在根目录下的data文件夹中，每个key对应一个文件，文件名为key的md5值，文件内容为value
