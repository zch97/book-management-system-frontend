import { InboxOutlined } from "@ant-design/icons";
import { message } from "antd";
import Dragger, { DraggerProps } from "antd/es/upload/Dragger";

interface CoverUploadProps {
    value?: string;
    onChange?: Function
}

let onChange: Function;

const props: DraggerProps = {
    name: 'file',
    action: 'http://localhost:3000/book/upload',
    method: 'post',
    onChange(info) {
        const { status } = info.file;
        if (status === 'done') {
            onChange(info.file.response);
            message.success(`${info.file.name} 文件上传成功`);
        } else if (status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }
    }
};

const dragger = <Dragger {...props}>
    <p className="ant-upload-drag-icon">
        <InboxOutlined />
    </p>
    <p className="ant-upload-text">点击或拖拽文件到这个区域来上传</p>
</Dragger>

export function CoverUpload(props: CoverUploadProps) {
    /**
     * ts中，感叹号是非空断言操作符。它告诉 TypeScript 编译器，虽然变量可能是可选的（即可以为 undefined 或 null），但在当前上下文中，该变量肯定不是 undefined 或 null
     * 也就是用感叹号告诉了 ts 编译器，props.onChange在这里不会是undefined
     */
    onChange = props.onChange!

    return props?.value ? <div>
        <img src={'http://localhost:3000/' + props.value} alt="封面" width="100" height="100"/>
        {dragger}
    </div>: <div>
        {dragger}
    </div>
}
