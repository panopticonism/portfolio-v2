import { Logo } from "components/icons/Logo";
import styles from "./Footer.module.css";
import { useForm, ValidationError } from "@formspree/react";

const Footer = () => {
  const [state, handleSubmit] = useForm("xnqwzlnb");
  const currentYear = new Date().getFullYear();

  return (
    <>
      {state.succeeded ? (
        <section className={styles.contact_me} id="contact_me">
          <h1>Contact me</h1>
          <p className={styles.submit_message}>
            Thank you! Your message has been received.
          </p>
        </section>
      ) : (
        <section className={styles.contact_me} id="contact_me">
          <h1>Contact me</h1>
          <p className={styles.intro_copy}>
            Send me a detailed message below and I&apos;ll get back to you as soon as
            possible.
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <fieldset>
              <div>
                <label htmlFor="full-name">Full name<span className={styles.required} aria-hidden="true"> *</span></label>
                <input id="full-name" type="text" name="name" required />
                <ValidationError
                  prefix="name"
                  field="name"
                  errors={state.errors}
                />
              </div>
              <div>
                <label htmlFor="company">Company&apos;s name<span className={styles.required} aria-hidden="true"> *</span></label>
                <input id="company" type="text" name="company" required />
                <ValidationError
                  prefix="company"
                  field="company"
                  errors={state.errors}
                />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="email">Email address<span className={styles.required} aria-hidden="true"> *</span></label>
                <input id="email" type="email" name="email" required />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone number</label>
                <input id="phone" type="tel" name="phone" />
                <ValidationError
                  prefix="Phone"
                  field="phone"
                  errors={state.errors}
                />
              </div>
            </fieldset>
            <label htmlFor="message">Message<span className={styles.required} aria-hidden="true"> *</span></label>
            <textarea id="message" name="message" rows={4} cols={50} required />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <button
              type="submit"
              disabled={state.submitting}
              className={styles.learn_more}
            >
              <span className={styles.projects_button}>
                {state.submitting ? "Sending…" : "Send message"}
              </span>
            </button>
          </form>
        </section>
      )}
      <footer className={styles.footer}>
        <Logo width={30} height={63} />
        <span>© 2021 – {currentYear} MAL. All rights reserved.</span>
      </footer>
    </>
  );
};

export default Footer;
