import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
  } from '@mantine/core';
import { backend_url } from '../../../config';
import axios from 'axios';
import {showNotification} from '@mantine/notifications';
  // import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';

  
  export function AuthenticationForm(props) {
    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
      initialValues: {
        email: '',
        userType:'',
        name: '',
        password: '',
        hospitalName:'',
        terms: true,
      },
  
      validate: {
        email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      },
    });
  
    return (
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to DigiPartogram, {type} with
        </Text>
  
        {/* <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group> */}
  
        <Divider labelPosition="center" my="lg" />
  
        <form onSubmit={form.onSubmit(() => {
<<<<<<< Updated upstream
              console.log(form.values)
              if(type === 'register') {
                axios.post(
                  `${backend_url}/auth/register`,
                  {
                    username: form.values.name,
                    password: form.values.password,
                    email: form.values.email,
                    userType: form.values.userType,
                    hospitalName: form.values.hospitalName
                  },
                  {
                    withCredentials: true
                  }
                ).then(
                  (response) => {
                    // console.log(response.data)
                    showNotification(
                      {color: 'green',
                      message: response.data.message}
                    )
                  }
                ).catch((err)=> {
                  // console.log(err)
                  
                  showNotification({
                    message: err.response.data.message,
                    color:'red'})
                  
                 })
              }

=======
          console.log(form.values);
>>>>>>> Stashed changes
        })}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              />
            )}
  
            <TextInput
              required
              label="Email"
              placeholder="Enter email here"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
            />
  
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
            />

              <TextInput
              required
              label="User Type"
              placeholder="Enter Nurse/Doctor"
              value={form.values.userType}
              onChange={(event) => form.setFieldValue('userType', event.currentTarget.value)}
              // error={form.errors.email && 'Invalid email'}
            />

              <TextInput
              required
              label="Hospital Name"
              placeholder="Enter Name"
              value={form.values.hospitalName}
              onChange={(event) => form.setFieldValue('hospitalName', event.currentTarget.value)}
              // error={form.errors.email && 'Invalid email'}
            />
  
            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Stack>
  
          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit">{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    );
  }