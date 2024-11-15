"use client";
import { InputDefault } from "@/components/Input";
import { Loading } from "@/components/Loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CadastrarChavePix() {
  const [idConsentimento, setIdConsentimento] = useState<string>("");
  const [urlAutorizacao, setUrlAutorizacao] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    pixKey: "",
    pixType: "",
  });
  const router = useRouter();

  const handleInputChange = (key: keyof typeof formData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleEnviarPix = () => {
    const requestData = {
      pixKey: formData.pixKey,
      pixType: formData.pixType,
    };
    setLoading(true);
    axios
      .post(`/consentimento`, requestData)
      .then((response: any) => {
        toast.success("Pix aprovado com sucesso, aguarde o consentimento...");
        console.log(response);
        setIdConsentimento(response.data.idConsentimento);
        solicitarAutorizacao(idConsentimento);
      })
      .catch((error: any) => {
        toast.error(
          "Ocorreu um erro ao tentar enviar o email. Por favor, tente novamente."
        );
        setLoading(false);
      });
  };

  const solicitarAutorizacao = (id: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`/autorizacao/${id}`);
        const status = response.data.status;

        if (status === "ok") {
          toast.success("Autorização concluída com sucesso!");
          setLoading(false);
          setUrlAutorizacao(response.data.urlAutorizacao)
          router.push(urlAutorizacao); 
          clearInterval(interval);
          monitorarAceite(idConsentimento);
        } else if (status !== "accept") {
          toast.error("Ocorreu um erro na autorização. Processo encerrado.");
          setLoading(false);
          clearInterval(interval);
        }
      } catch (error) {
        toast.error("Erro na autorização.");
        setLoading(false);
        clearInterval(interval);
      }
    }, 2000); 
  };

  const monitorarAceite = (id: string) => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`/status/autorizacao/${id}`);
        const status = response.data.status;

        if (status === "ok") {
          toast.success("Termos aceitos com sucesso!");
          setLoading(false);
          clearInterval(interval);
        } else if (status === "erro") {
          toast.error("Erro no aceite dos termos.");
          setLoading(false);
          clearInterval(interval);
        }
      } catch (error) {
        toast.error("Erro ao verificar o aceite dos termos.");
        setLoading(false);
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <div className="w-full h-full flex justify-center text-black my-10">
      <div className="w-full flex items-center flex-col gap-2">
        {loading ? (
          <Loading text="Processando" />
        ) : (
          <div className="w-full flex items-center flex-col gap-2">
            <h1 className="text-xl font-bold">Cadastrar chave pix</h1>
            <InputDefault
              type="text"
              label="Chave pix"
              placeholder="Ex. 11 99999-9999"
              width="w-[300px]"
              height="h-[42px]"
              onChange={(e) => handleInputChange("pixKey", e.target.value)}
            />
            <div className="flex flex-col">
              <select
                id="pixType"
                name="pixType"
                onChange={(e) => handleInputChange("pixType", e.target.value)}
                className="w-[180px] h-[42px] border-[#6F76AB/20] border-solid rounded-md pl-3 py-1 text-xs text-black text-top border outline-none mt-2 placeholder-[#B9B9B9] shadow-sm"
              >
                <option value="" className="text-[#B9B9B9]">
                  Tipo da chave pix
                </option>
                <option value="CPF">CPF</option>
                <option value="CNPJ">CNPJ</option>
                <option value="EMAIL">EMAIL</option>
                <option value="TELEFONE">TELEFONE</option>
                <option value="ALEATORIO">ALEATÓRIO</option>
              </select>
            </div>
            <button
              className="bg-[#fe9d10] text-white px-3 py-2 rounded-md shadow-md hover:opacity-70 transition-all duration-300"
              onClick={handleEnviarPix}
            >
              ENVIAR
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
