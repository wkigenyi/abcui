import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useSnackbar } from 'notistack';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const {enqueueSnackbar} = useSnackbar()
  const user = sessionStorage.getItem("abcUser")
  const user_id = JSON.parse(user).id
  const formik = useFormik({
    initialValues: {
      old_password: '',
      password: '',
      confirm_password: '',
      submit: null
    },
    validationSchema: Yup.object({
      old_password: Yup
        .string()
        .max(255)
        .required('Current Password is required'),
      password: Yup
        .string()
        .max(255)
        .required('New password is required'),
      confirm_password: Yup
        .string()
        .max(255)
        .required('Confirm new password')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.changePassword(values.old_password, values.password, values.confirm_password,user_id);
        auth.signOut();
        router.push('/auth/login');
        enqueueSnackbar("Password Changed Successfully, Login with the new password",{variant:"success"})
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          ABC Recon | Change Password
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Change password
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t want to change password right now ?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.old_password && formik.errors.old_password)}
                  fullWidth
                  helperText={formik.touched.old_password && formik.errors.old_password}
                  label="Current Password"
                  name="old_password"
                  type="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.old_password}
                />
                <TextField
                  error={!!(formik.touched.email && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.password}
                  label="New Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <TextField
                  error={!!(formik.touched.confirm_password && formik.errors.confirm_password)}
                  fullWidth
                  helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                  label="Confirm Password"
                  name="confirm_password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.confirm_password}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                disabled={auth.isLoading}
                type="submit"
                variant="contained"
              >
                {auth.isLoading?"Changing Password":"Change Password"}
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
