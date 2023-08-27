export type AttributeValue = {
    _id: string;
    name: string;
};

export type Attribute = {
    _id: string;
    name: string;
    value: AttributeValue[];
};
