import {  useField } from 'formik';
import React from 'react';
import { Button, Card, Form, Icon, Image, Label } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    placeholder: string;
    name: string;
    label?: string;

}

export default function MyStatusInput(props: Props) {
    const [field, meta] = useField(props.name);
    return (

        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label> 
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>


    )




}