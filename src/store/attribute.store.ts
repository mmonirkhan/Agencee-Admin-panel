import { create } from "zustand";
import type { Attribute } from "../models/attribute.model";
import { getAllAttribute } from "../services/attribute.service";

type State = {
    attributes: {
        loading: boolean;
        data: Attribute[];
        error?: string;
    };
};

type Action = {
    fetchAttributes: () => void;
    addNewAttribute: (attribute: Attribute) => void;
    updateAttribute: (attribute: Attribute) => void;
};

// Create your store, which includes both state and (optionally) actions
const useAttributeStore = create<State & Action>((set) => ({
    attributes: {
        loading: false,
        data: [],
    },
    fetchAttributes: async () => {
        set((state) => ({
            attributes: { ...state.attributes, loading: true },
        }));
        try {
            const attributes = await getAllAttribute();

            const data: Attribute[] = attributes.data.map((attrItem: any) => ({
                _id: attrItem._id,
                name: attrItem.name,
                value: attrItem.value.map((attrValue: any) => ({
                    _id: attrValue.attribute_value._id,
                    name: attrValue.attribute_value.name,
                })),
            }));

            set(() => ({
                attributes: { loading: false, data },
            }));
        } catch (error: any) {
            set((state) => ({
                attributes: {
                    ...state.attributes,
                    loading: false,
                    error: error.message,
                },
            }));
        }
    },
    addNewAttribute: (attribute) => {
        set((state) => ({
            attributes: {
                ...state.attributes,
                data: [...state.attributes.data, attribute],
            },
        }));
    },
    updateAttribute: (attribute) => {
        const updatedAttribute = {
            _id: attribute._id,
            name: attribute.name,
            value: attribute.value.map((attrValue: any) => ({
                _id: attrValue.attribute_value._id,
                name: attrValue.attribute_value.name,
            })),
        };
        set((state) => ({
            attributes: {
                ...state.attributes,
                data: state.attributes.data.map((item) =>
                    item._id === attribute._id ? updatedAttribute : item
                ),
            },
        }));
    },
}));

export default useAttributeStore;
