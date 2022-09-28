import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { text } from "stream/consumers";
import Formulario from "./Formulario";

describe("Testando o comportamente do Formulario.tsx", () => {
  test("Quansdo o impurt está vazio novos participantes não podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    //encontrar no DOM o imput
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    //encontrar o botão
    const botao = screen.getByRole("button");
    // garantir que o imput esteja no documento
    expect(input).toBeInTheDocument();
    // garantir que o botão esteja no desabilitado
    expect(botao).toBeDisabled();
  });

  test("Como adicionar um participante caso exista um nome preenchido", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    //encontrar no DOM o imput
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    //encontrar o botão
    const botao = screen.getByRole("button");

    //inserir um valor no imput
    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });

    //clicar no botão de submeter
    fireEvent.click(botao);

    //garantir que o imput estaja com o foco ativo
    expect(input).toHaveFocus();

    //garantir que o input não tenha um valor
    expect(input).toHaveValue("");
  });

  test("Nomes duplicados não podem ser edicionados na lista", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });
    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });
    fireEvent.click(botao);

    const mensagemDeErro = screen.getByRole("alert");
    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos!"
    );
  });

  test("Testando se a mensagem de erro some após x segundos", () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });
    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: "Ana Catarina",
      },
    });
    fireEvent.click(botao);

    let mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    mensagemDeErro = screen.queryByRole("alert");
    expect(mensagemDeErro).toBeNull();
  });
});
