import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8085/api/topics',
    // no default JSON header
});

function buildFormData(topic) {
    const {
        files = [],
        resource = '',
        resources: existingResources = [],
        ...rest
    } = topic;

    const mergedResources = existingResources.slice();
    if (resource.trim()) {
        mergedResources.push(resource.trim());
    }

    const payload = {
        ...rest,
        resources: mergedResources,
    };

    // 4) pack it into FormData
    const form = new FormData();
    form.append(
        'topic',
        new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );
    files.forEach(file => form.append('files', file));

    return form;
}

export const getTopics = () =>
    client.get('').then(res => res.data);

export const createTopic = topic =>
    client
        .post('', buildFormData(topic))
        .then(r => r.data);

export const updateTopic = (id, topic) =>
    client
        .put(`/${id}`, buildFormData(topic))
        .then(r => r.data);

export const deleteTopic = id =>
    client.delete(`/${id}`);